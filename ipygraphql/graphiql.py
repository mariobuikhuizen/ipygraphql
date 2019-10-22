from traitlets import Unicode, Int, Instance, Dict, observe
from ipywidgets import Widget, DOMWidget
from ipywidgets.widgets.widget import widget_serialization
from ._version import semver


class Handler(Widget):
    pass


class GraphiQL(DOMWidget):

    _model_name = Unicode('GraphiQLModel').tag(sync=True)

    _view_name = Unicode('GraphiQLView').tag(sync=True)

    _view_module = Unicode('jupyter-graphql').tag(sync=True)

    _model_module = Unicode('jupyter-graphql').tag(sync=True)

    _view_module_version = Unicode(semver).tag(sync=True)

    _model_module_version = Unicode(semver).tag(sync=True)

    height = Unicode('600px', allow_none=True).tag(sync=True)

    url = Unicode().tag(sync=True)

    handler = Instance(Handler, default_value=None, allow_none=True)\
        .tag(sync=True, **widget_serialization)

    query = Unicode().tag(sync=True)

    variables = Dict(default_value=None, allow_none=True).tag(sync=True)

    response = Dict(default_value=None, allow_none=True).tag(sync=True)


class BackendHandler(Handler):

    _model_name = Unicode('BackendHandlerModel').tag(sync=True)

    _model_module = Unicode('jupyter-graphql').tag(sync=True)

    _view_module_version = Unicode(semver).tag(sync=True)

    _model_module_version = Unicode(semver).tag(sync=True)

    request = Dict(default_value=None, allow_none=True).tag(sync=True)

    response = Dict(default_value=None, allow_none=True).tag(sync=True)

    timeout = Int(10000).tag(sync=True)

    @observe('request')
    def _handle_request(self, change):
        if not change['new']:
            return

        self.response = None
        result = self.handle(change['new'])

        self.request = None
        self.response = result

    def handle(self, request):
        pass


class FrontendHttpHandler(Handler):

    _model_name = Unicode('FrontendHttpHandlerModel').tag(sync=True)

    _model_module = Unicode('jupyter-graphql').tag(sync=True)

    _view_module_version = Unicode(semver).tag(sync=True)

    _model_module_version = Unicode(semver).tag(sync=True)

    url = Unicode().tag(sync=True)


__all__ = ['GraphiQL', 'Handler', 'BackendHandler', 'FrontendHttpHandler']
