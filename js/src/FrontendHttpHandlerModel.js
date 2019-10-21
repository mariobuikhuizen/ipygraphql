/* eslint camelcase: off */
import { WidgetModel } from '@jupyter-widgets/base';
import fetch from 'isomorphic-fetch';
import { version } from './version';

export function handleRequest(url, request) {
    return fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    }).then(response => response.json());
}

export class FrontendHttpHandlerModel extends WidgetModel {
    defaults() {
        return {
            ...super.defaults(),
            ...{
                _model_name: 'FrontendHttpHandlerModel',
                _model_module: 'jupyter-graphql',
                _view_module_version: `^${version}`,
                _model_module_version: `^${version}`,

                url: null,
            },
        };
    }

    handleRequest(request) {
        return handleRequest(this.get('url'), request);
    }
}


FrontendHttpHandlerModel.serializers = {
    ...WidgetModel.serializers,
};
