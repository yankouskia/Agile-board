'use strict';
import _ from 'lodash';
import {DB_CHANGE} from 'shared/socketEventTypes';

export default (socket) => {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        template: require('./hello-world.html'),
        controllerAs: 'helloWorldCtrl',
        controller: function () {
            this.greeting = 'Agile board'; 
        },
        link: function($scope) {
            $scope.clickMe = async () => {
                socket.on(DB_CHANGE, async (data) => {
                    console.log('db change!!!!!!!!', data);
                    var requestTemplate = '/task/getAll/';
                    var ans = await fetch(requestTemplate)
                        .then(function(response) {
                            if (response.status >= 400) {
                                throw new Error('Bad response from server');
                            }
                            return response.json();
                        })
                        .then(function(stories) {
                            let allTasks = stories.rows.map((item) => {
                                return item.doc;
                            });
                            return allTasks;
                        });
                    console.log('ans', ans);
                })
                console.log(_);


                // var requestTemplate = _.template('/task/get/<%= id %>');
                // var ans = await fetch(requestTemplate({id: 'layoutbootstrap'}))
                //     .then(function(response) {
                //         if (response.status >= 400) {
                //             throw new Error('Bad response from server');
                //         }
                //         return response.json();
                //     })
                //     .then(function(task) {
                //         return task;
                //     });
                // console.log('found task', ans);

                // var requestTemplate = '/task/getAll/';
                // var ans = await fetch(requestTemplate)
                //     .then(function(response) {
                //         if (response.status >= 400) {
                //             throw new Error('Bad response from server');
                //         }
                //         return response.json();
                //     })
                //     .then(function(stories) {
                //         let allTasks = stories.rows.map((item) => {
                //             return item.doc;
                //         });
                //         return allTasks;
                //     });
                // console.log('ans', ans);


                await fetch('/task/add', {
                  method: 'post',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    name: 'Hubot',
                    login: 'hubot',
                  })
                });

                // var ans = await fetch('/task/update', {
                //     method: 'post',
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({
                //         _id: 'newstoryaboutkoa',
                //         _rev: '1-7bd2e7ca12cf464b1311b601d035c147',
                //         name: 'Hubot123',
                //         login: 'hubot456',
                //     })
                // })
                // console.log(ans);
            }
        }
    }
};
