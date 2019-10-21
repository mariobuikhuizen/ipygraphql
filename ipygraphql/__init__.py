from ._version import version_info, __version__  # noqa: F401
from .graphiql import *  # noqa: F401, F403


def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyter-graphql',
        'require': 'jupyter-graphql/extension'
    }]
