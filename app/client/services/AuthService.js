'use strict';
import _ from 'lodash';
import {Base64} from 'js-base64';

export default class AuthService {

	getUserById = async (creds) => {
        let userId = Base64.encode(creds.login) + Base64.encode(creds.password);
		var requestTemplate = _.template('/task/get/<%= id %>');
        var ans = await fetch(requestTemplate({id: userId}))
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then(function(user) {
                return user;
            });
        return ans || null;
	}

	createUser = async (user) => {
        let newUser = {
            login: user.login,
            _id: Base64.encode(user.login) + Base64.encode(user.password)
        };
        await fetch('/task/add', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
    }
}
