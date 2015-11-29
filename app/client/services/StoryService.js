'use strict';
import _ from 'lodash';
import shortid from 'shortid';
import {cloneDeep} from 'lodash/lang';

function createOptions(name) {
    var options = {
        name: name,
        placeholder: 'board__info__container',
        connectWith: '.board__info'
    };
    return options;
}

export default class StoryService {

	constructor() {

        this.tasks = [];
        this.previousItems = null
        this.currentItems = null;
        this.closedItems = [];
        this.currentColumnType = null;

        this.columns = [
            {
                title: 'To Do',
                status: 'todo',
                options: createOptions('todo'),
                tasks: []
            },
            {
                title: 'In Progress',
                status: 'progress',
                options: createOptions('progress'),
                tasks: []
            },
            {
                title: 'Done',
                status: 'done',
                options: createOptions('done'),
                tasks: []
            }
        ];

        this.initOptionsEvent();
	}

    initOptionsEvent = () => {
        this.columns.forEach(column => {
            column.options.update = () => {
                this.currentColumnType = column.status;
                this.previousItems = cloneDeep(this.currentItems);
                this.currentItems = cloneDeep(column.tasks);
                if(this.previousItems && this.currentItems) {
                    this.resolveChangedStatus();
                }
            };
        })
    }

    resolveChangedStatus = () => {
        let updated = false;
        this.previousItems.forEach((prev) => {
            this.currentItems.forEach((cur) => {
                if(prev._id === cur._id) {
                    let storyToUpdate = Object.assign({}, prev);
                    storyToUpdate.status = this.currentColumnType;
                    this.updateStory(storyToUpdate);
                    updated = true;
                }
            })
        });
        if(updated) {
            this.currentItems = null;
            this.previousItems = null;
        };
    }

	getStories = (cb) => {
        let dataToJson = function(response) {
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            return response.json();
        };

        let transformer = (stories) => {
            let allTasks = stories.rows.map((item) => {
                return item.doc;
            });
            return allTasks;
        };

        let fillTask = (newTasks) => {
            // use lodashthisk.merge([], []);
            this.closedItems.splice(0, this.closedItems.length);
            this.tasks.splice(0, this.tasks.length);
            newTasks.forEach((t) => {
                this.tasks.push(t);
            });
            this.columns[0].tasks.splice(0, this.columns[0].tasks.length);
            this.columns[1].tasks.splice(0, this.columns[1].tasks.length);
            this.columns[2].tasks.splice(0, this.columns[2].tasks.length);

            this.tasks.forEach((task) => {
                if(task.status === 'todo') {
                    this.columns[0].tasks.push(task);             
                } else if (task.status === 'progress') {
                    this.columns[1].tasks.push(task);             
                } else if(task.status === 'done') {
                    this.columns[2].tasks.push(task);             
                } else {
                    this.closedItems.push(task);
                }
            });
            if(cb) {
                cb();
            }
        }

        var requestTemplate = '/task/getAll/';

        fetch(requestTemplate)
            .then(dataToJson)
            .then(transformer)
            .then(fillTask);
	}

	getStoryById = async () => {
		var requestTemplate = _.template('/task/get/<%= id %>');
        var ans = await fetch(requestTemplate({id: 'layoutbootstrap'}))
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then(function(task) {
                return task;
            });
        return ans || null;
	}

	createStory = async (story) => {
        story._id = shortid.generate();
        await fetch('/task/add', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(story)
        });
    }

    deleteStory = async (story) => {
        await fetch('/task/delete', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(story)
        });
    }

	updateStory = async (story) => {
        await fetch('/task/update', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(story)
        });
    }
}
