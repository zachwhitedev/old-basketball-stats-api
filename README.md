useful links:

- https://www.youtube.com/watch?v=VO3tGUFQRKw

Important to know: the trick to all this is to always choose "sample application" when setting up the EB application, and then going immediately into CloudPipeline and telling it which GitHub repo to point at your application. Then the next time you push a change to master it will cause your repo files to replace the code of the sample app. Pretty slick. 

After that, most of the necessary changes that are left boil down to:

- always have that buildspec.yml file, since you tell AWS it's there when setting up your application
- editing the 'deploy' stage of your CloudPipeline to use 'SourceArtifact' and not 'BuildArtifact'
- on a similar note, remember you're creating a new project when you go to CloudPipeline for the first time for an app. Naming it 'projectname-proj' seems to be a good practice.
- don't forget to add any necessary environment variables when creating your environment, underneath the "Software" tab
- don't forget to add a Load Balancer in the 'Capacity Tab' if necessary. Honestly don't do this until your app starts getting some serious traffic, because otherwise that LB is going to push your monthly bill from like $4 to $20 