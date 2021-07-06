# Config

First of all you will need to make a fork to your Github account,
try this, in this page in te upper-right corner, you should see a button that says "Fork".
After clicking it, it'll ask to were you want to fork the repo, select your Github
account.
Then move to your accoun and look for the newly forked repo.

In tha forked repo > inside your github account >

Clone the repo to a desired location in your computer.

    $ git clone {Repo url}

Then you will need to type:

    $ npm install

That will install the "node_modules" folder into the cloned project.
after that tap:

    $ git status

If git hasn't been init yet, then write:

    $ git init

Proceed to update your git config:

    $ git config --global user.name {your name}

    $ git config --global user.email {your email}

Check if your remote is set up correctly, tap:

    $ git remote

It should be called "origin".
if nothing appears then write down:

    $ git remote add origin {Repo url}

Then "origin" should appear as your remote.
Next we need to fetch the QA branch from the remote,
and pair it with your local, so write:

    $ git fetch origin QA

    $ git switch QA

After you have done all this steps, try to add your name down below,
then add and commit, and finally push to see if everything is working
correctly.

So write the next:

(modify the README adding your name to the list)

    $ git add .

    $ git commit -m "Commit test"

    $ git push

If everything goes north, there should be no problems when pushing the
commits, and in the remote repo, changes should appear under the
"QA" branch.

NAME LIST TO UPDATE:

1- Quielo

2- Charly

3-

4-

5-

\*\*Also everything should be update, but in case it doesn't, write down:

    $ git pull origin QA

That should do.

To check if the project is setup correctly in you VSC terminal write:

    $ npm start

localhost:3000 should open normally and down the React logo should appeard
"Hello world" in blue.

Happy Hacking!

PD: You can work any branches you want in your personal remote (your github account)
but when makin a pull, you are requested to send it to the QA branch in
https://github.com/Quielo/R6VC/tree/QA
From there all code will be reviewed, if conflicts arise, they will be inspected in the same (QA) branch.
After reviewing a pull and no conflics be detected, the code will be send to the "develop" branch by the
repo owner (me). So whenever you want to make a fetch request to update your code before you start to work
(and you will be required to do this before you start making any changes.) you should always do it from
the "develop" branch.

    $ git fetch origin develop

[

    Develop branch is our code up to date

    QA branch is our code battleground

]
