What have been changed:

* Plugin structure is overhauled
* Adapted to Rails 6
* Periodically ajax requests replaced with pure javascript timer
* Added functional tests

Preview:

![](https://github.com/red-soft-ru/time_logger/raw/41516d258daaaabcf6813761c452d670fde87799/1552138058249.gif)

## Install

1. Clone the plugin to your redmine root directory/plugins

    ```
    git clone http://git.red-soft.biz/red2mine/time_logger.git redmine_directory/plugins/time_logger
    ```
2. Setup the database using the migrations

    ```
    bundle exec bin/rails redmine:plugins:migrate RAILS_ENV=production NAME=time_logger
    ```
3. Login to your Redmine install as an Administrator
4. Setup the 'log time' permissions for your roles
5. Enable a "Time tracking" module in the project settings
6. The link to the plugin should appear in the 'account' menu bar

## Running tests

Inside your redmine root directory run command:


    bundle exec bin/rails redmine:plugins:test RAILS_ENV=test NAME=time_logger

## Uninstall 

1. Clean up a database: 

    ```
    bundle exec bin/rails redmine:plugins:migrate RAILS_ENV=production NAME=time_logger VERSION=0
    ```
2. Delete plugin folder: 

    ```
    rm -rf <redmine_root>/plugins/time_logger
    ```