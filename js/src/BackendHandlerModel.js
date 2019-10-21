/* eslint camelcase: off */
import { WidgetModel } from '@jupyter-widgets/base';
import { version } from './version';

export class BackendHandlerModel extends WidgetModel {
    defaults() {
        return {
            ...super.defaults(),
            ...{
                _model_name: 'BackendHandlerModel',
                _model_module: 'jupyter-graphql',
                _view_module_version: `^${version}`,
                _model_module_version: `^${version}`,

                request: null,
                response: null,
                timeout: null,
            },
        };
    }

    handleRequest(request, view) {
        if (!this.onChangeSet) {
            this.onChangeSet = true;
            this.on('change:response', () => {
                if (this.resolve) {
                    this.resolve(this.get('response'));
                    this.resolve = undefined;
                }
            });
        }

        if (this.resolve) {
            // eslint-disable-next-line no-console
            console.warn('Still waiting on request, ignoring new request');
            return Promise.reject(new Error('Still waiting on request, ignoring new request'));
        }

        this.set('request', request);
        this.save_changes(this.callbacks(view));

        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            setTimeout(() => reject(new Error('timeout')), this.get('timeout'));
        });
    }
}


BackendHandlerModel.serializers = {
    ...WidgetModel.serializers,
};
