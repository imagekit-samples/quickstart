# Introduction 

This sample project shows an implementation of all methods exposed by Python SDK. You can copy-paste code snippet from here in your application and edit the values as per your requirement.

# How to run locally

You will find `sample.py` in root folder. 

Open `python/sample.py` file and replace placeholder credentials with actual values. You can get the value of [URL-endpoint](https://imagekit.io/dashboard#url-endpoints) from your ImageKit dashboard. API keys can be obtained from the [developer](https://imagekit.io/dashboard/developer/api-keys) section in your ImageKit dashboard.

In `sample.py` file, set the following parameters for authentication:

```python
from imagekitio import ImageKit
imagekit = ImageKit(
    private_key='your private_key',
    public_key='your public_key',
    url_endpoint = 'your url_endpoint'
)
```

- You will find the dependencies in `python/requirements.txt` file.

## Install dependencies

To install dependencies that are in the `requirements.txt` file can fire this command to install them:

```shell
pip install -r requirements.txt
```

Now run `sample.py`. If you are using CLI Tool (Terminal/Command prompt), open the project in CLI and execute it.

```shell
cd project-name
pip install imagekitio  # if not installed already
python sample.py        # to run sample.py file
```

# Useful links
* Python quickstart guide - https://docs.imagekit.io/getting-started/quickstart-guides/python
* Python SDK and documentation - https://github.com/imagekit-developer/imagekit-python

# Report a bug
If something doesn't work as expected, report a bug at [support@imagekit.io](https://github.com/imagekit-developer/imagekit-python)
