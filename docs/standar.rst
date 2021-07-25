.. _standar:

Eslint and jsdoc
================

Finally, this extras are standarization to secure that the code is under ECMAscript and they give proper information to other developers about the functions or estructure we propused. Install Eslint and jsdoc::

    npm install eslint --save-dev

    npm install --save-dev jsdoc

The next step is initialized eslint::

    npx eslint --init

After we installed jsdoc, we only need to enter ``/**`` and fill in the information required to document our functions, for example:

.. image:: ./_templates/resources/jsdoc.png
    :alt: Successful tests
    :align: center

It helps to restrict your parameters as typescript does, that’s a good point to start if you haven’t work with typescript before.

The moment we ``run npx eslint --init``, it creates a JSON file based on the answers we give in the initialization process. If you want to learn more about which options are more accurate for your project , you can read this documentation `Setting up ESLINT in your JavaSrcipt Project with VS Code <https://dev.to/devdammak/setting-up-eslint-in-your-javascript-project-with-vs-code-2amf>`_. When the JSON was created, is time to setup the rules. Because this project is for begginers developers, I will give you a basic configuration::

    {
        "env": {
            "browser": true,
            "node": true,
            "es2021": true,
            "jest": true
        },
        "extends": [
            "eslint:recommended",
            "plugin:react/recommended"
        ],
        "parserOptions": {
            "ecmaFeatures": {
                "jsx": true
            },
            "ecmaVersion": 12,
            "sourceType": "module"
        },
        "plugins": [
            "react"
        ],
        "rules": {
            "no-console": "warn", 
            "no-use-before-define": "warn",
            "no-empty": "warn",
            "no-irregular-whitespace": "warn",
            "spaced-comment": "warn",
            //Only apply in App.js before fix all eslint warnings, because is under workflow pass params
            "react/prop-types": "off",
            //Only apply for room.jsx before fix all eslint warnings, because is under workflow pass params
            "react/jsx-key": "off",
            "quotes": ["error", "double", { "allowTemplateLiterals": true}]
        }
    }

You must read the official documents to set a better configuration for your projects. Here are the rules list and how to `Configuring Rules <https://eslint.org/docs/user-guide/configuring/rules#configuring-rules>`_.

Believe that when you pass all this libraries with success, your code is ready to merge with the main branch and your team will be assured that your code is legit!