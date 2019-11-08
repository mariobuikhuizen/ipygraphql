import { DOMWidgetView } from '@jupyter-widgets/base';
import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';
import { handleRequest } from './FrontendHttpHandlerModel';
// eslint-disable-next-line import/no-webpack-loader-syntax
import graphiqlCss from '!!raw-loader!graphiql/graphiql.css';
import 'graphiql/dist/lint.css';
import 'graphiql/dist/info.css';

export class GraphiQLView extends DOMWidgetView {
    render() {
        super.render();

        this.displayed.then(() => {
            const shadowRoot = this.el.attachShadow({ mode: 'open' });

            const style = document.createElement('style');
            style.innerText = graphiqlCss;
            shadowRoot.appendChild(style);

            const root = document.createElement('div');

            const setHeight = () => {
                const height = this.model.get('height');
                if (height) {
                    root.style.height = height;
                } else {
                    root.style.height = 'unset';
                }
            };
            setHeight();
            this.model.on('change:height', setHeight);

            shadowRoot.appendChild(root);

            /* Making the shadow appear like document so react events work as normal. See
             * https://github.com/facebook/react/issues/9242 */
            Object.defineProperty(root, 'ownerDocument', { value: shadowRoot });
            ['createElement', 'createElementNS', 'createTextNode']
                .forEach((fnName) => {
                    shadowRoot[fnName] = (...args) => document[fnName](...args);
                });

            const view = this;

            function graphQLFetcher(graphQLParams) {
                const url = view.model.get('url');

                if (url) {
                    return handleRequest(url, graphQLParams);
                }
                return view.model.get('handler').handleRequest(graphQLParams, view);
            }

            ReactDOM.render(
                React.createElement(StateWrapper, {
                    model: this.model,
                    view: this,
                    fetcherImpl: graphQLFetcher,
                }),
                root,
            );
        });
    }
}

class StateWrapper extends React.Component {
    constructor(props) {
        super(props);

        const { fetcherImpl, model, view } = props;
        model.on('change', () => this.forceUpdate());

        this.fetcherWrapper = (graphQLParams) => {
            const userExecuted = graphQLParams.operationName !== 'IntrospectionQuery';

            if (userExecuted) {
                model.set('query', graphQLParams.query);
                model.set('variables', graphQLParams.variables);
                model.save_changes(model.callbacks(view));
            }

            return fetcherImpl(graphQLParams).then((json) => {
                if (userExecuted) {
                    model.set('response', json);
                    model.save_changes(model.callbacks(view));
                }
                return json;
            });
        };
    }

    render() {
        const { model } = this.props;

        const variables = model.get('variables');
        const response = model.get('response');

        return React.createElement(GraphiQL, {
            fetcher: this.fetcherWrapper,
            query: model.get('query'),
            variables: variables ? JSON.stringify(variables) : '',
            response: response ? JSON.stringify(response, null, 2) : '',
        });
    }
}
