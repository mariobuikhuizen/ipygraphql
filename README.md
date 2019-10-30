[![Version](https://img.shields.io/npm/v/jupyter-graphql.svg)](https://www.npmjs.com/package/jupyter-graphql)
[![Version](https://img.shields.io/pypi/v/ipygraphql.svg)](https://pypi.python.org/mariobuikhuizen/ipygraphql)
[![Conda Version](https://img.shields.io/conda/vn/conda-forge/ipygraphql.svg)](https://anaconda.org/conda-forge/ipygraphql)
[![Binder](https://mybinder.org/badge.svg)](https://mybinder.org/v2/gh/mariobuikhuizen/ipygraphql/master?filepath=example.ipynb)

ipygraphql
======

Graphql widgets for Jupyter

Installation
------------

To install use pip:

    $ pip install ipygraphql
    $ jupyter nbextension enable --py --sys-prefix ipygraphql


For a development installation (requires npm),

    $ git clone https://github.com/mariobuikhuizen/ipygraphql.git
    $ cd ipygraphql
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix ipygraphql
    $ jupyter nbextension enable --py --sys-prefix ipygraphql
