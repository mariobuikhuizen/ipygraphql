/* eslint camelcase: off */
import { DOMWidgetModel, unpack_models } from '@jupyter-widgets/base';
import { version } from './version';

export class GraphiQLModel extends DOMWidgetModel {
    defaults() {
        return {
            ...super.defaults(),
            ...{
                _model_name: 'GraphiQLModel',
                _view_name: 'GraphiQLView',
                _view_module: 'jupyter-graphql',
                _model_module: 'jupyter-graphql',
                _view_module_version: `^${version}`,
                _model_module_version: `^${version}`,

                height: null,
                url: null,
                handler: null,
                query: null,
                variables: null,
                response: null,
            },
        };
    }
}

GraphiQLModel.serializers = {
    ...DOMWidgetModel.serializers,
    handler: { deserialize: unpack_models },
};
