useful links:

- https://www.youtube.com/watch?v=VO3tGUFQRKw

Important to know: the trick to all this is to always choose "sample application" when setting up the EB application, and then going immediately into CloudPipeline and telling it which GitHub repo to point at your application. Then the next time you push a change to master it will cause your repo files to replace the code of the sample app. Pretty slick. 

After that, most of the necessary changes that are left boil down to:

- always have that buildspec.yml file, since you tell AWS it's there when setting up your application
- editing the 'deploy' stage of your CloudPipeline to use 'SourceArtifact' and not 'BuildArtifact'
- on a similar note, remember you're creating a new project when you go to CloudPipeline for the first time for an app. Naming it 'projectname-proj' seems to be a good practice.
- don't forget to add any necessary environment variables when creating your environment, underneath the "Software" tab
- don't forget to add a Load Balancer in the 'Capacity Tab' if necessary. Honestly don't do this until your app starts getting some serious traffic, because otherwise that LB is going to push your monthly bill from like $4 to $20 

PS I just realized I can't use this API in production until I upgrade it to use HTTPS. To do so it looks like I'll need to add a Load Balancer just so I can add a listener to it.

Update- added a Classic Load Balancer and bought a domain name with Route 53 AND added a subdomain onto that domain for the app to use as its HTTPS redirect. Whole thing was kind of a pain, but managed to do it in under 2 hours. This video was a great help: https://www.youtube.com/watch?v=JsqTSZo2qlQ

Feel like my AWS binge is over for now because I'm a bit worn out. Looking forward to getting back to actually developing next time.

Update- turns out my AWS binge wasn't over. Just made the switch from MySQL installed on a Digital Ocean droplet to AWS RDS PostgreSQL. I'm really liking the fact that RDS is managed, has a generous free tier, and I'm also really liking pgadmin4 as a GUI for managing it all. 