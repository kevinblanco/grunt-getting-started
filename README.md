# Grunt Getting Started #

## Tutorial Information ##

**Slides:** [slid.es/kevinblanco/grunt-getting-started](http://slid.es/kevinblanco/grunt-getting-started)  
**YouTube Tutorial Video:** [youtube.com](http://youtube.com)   


## Getting Started Grunt Guide##

This small repository shows the very basics about getting started with Grunt Javascript task runner. Follow the steps on the tutorial video and use this code as a base. The Slides shows important information as well.

First install NodeJS from the website.

    http://nodejs.org 

Then, install the Grunt command line interface.

    npm install -g grunt-cli

Then, get this code and run

    npm install

Last, run the defaul task

    grunt run

Then, follow the steps on the tutorial and slides.

## Directory Structure ##

	/node_modules ................. npm registered node modules
	/public ....................... compiled application files
	|-- /css ...................... compiled css
	|-- /js ....................... compiled js modules
	/src .......................... source directory
	|-- /assets ................... assets like images
	|-- /scripts .................. javascript source
	|-- |-- /vendor ............... javascript libraries
	|-- /styles ................... scss source
	|-- /html ..................... html pages
	.gitignore .................... git ignore directives
	GruntFile.js .................. grunt file
	package.json .................. grunt package information
	README.md ..................... readme file


## Grunt Tasks ##
 
Generate a local development build

    grunt run

## Contact ##

If you need more info, just contact me at:
	
	http://kevin-blanco.com
	me@kevin-blanco.com
	Skype: kevinblancok2
	@KevinBlancoZ