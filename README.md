Introduction

CineMe Productions is a film and media production website that I developed as part of my Web Development coursework. The website represents a creative production company based in Johannesburg, South Africa. Its purpose is to introduce the company, explain the services it provides, display examples of creative production work and give potential clients a way to make enquiries.

When I started working on this project, I wanted to create a website that looked like a professional film production company rather than a basic information website. I wanted visitors to understand what CineMe Productions does, view its creative work and easily find the company's contact information. Throughout the different parts of the assignment, I continued making changes to the structure, appearance and functionality of the website.

Part 1: Initial Planning and Website Structure

During Part 1, I concentrated on creating the basic structure of my website using HTML. I decided to develop CineMe Productions as a film and media production company because it gave me the opportunity to create a website around film production, photography, videography and other creative services.

I created five main pages for the website. These were the Home page, About page, Services page, Portfolio page and Contact page. I wanted each page to have a specific purpose instead of placing all the company's information on one page. The Home page introduces the company, the About page explains who the company is, the Services page explains what it offers, the Portfolio page displays creative work and the Contact page provides information for people who want to get in touch.

I also created the main folder structure for the project. I separated the HTML pages, CSS, JavaScript and images into different folders. This helped me organise my work and made it easier to locate specific files when I needed to make changes. I created a navigation menu that allowed visitors to move between the five pages.

During this stage, I learned the importance of using HTML elements correctly. I used headings, paragraphs, images, links, sections, navigation and footer elements to organise the website content. I also added comments in my code to identify different sections and make the files easier to understand.

After receiving feedback on Part 1, I realised that although I had managed to create the website structure and connect the pages, I had not given enough attention to the planning and documentation side of the project. Areas such as the project proposal, goals and objectives, proposed functionality, design aesthetic, wireframes, technical requirements, timeline, budget and sitemap still needed more attention. My content research and referencing also needed improvement.

This helped me understand that web development is not only about creating the website. Planning, research and documentation are also important because they explain why the website was created and how the different design decisions were made.

Part 2: Website Styling and Design

During Part 2, I concentrated on improving the appearance of the website using CSS. I wanted all five pages to have the same visual identity so that visitors could recognise that they were part of the same company website.

I chose a colour scheme consisting of white, blue and black. I used black to create a strong professional appearance, white to keep the pages clean and easy to read, and blue to highlight important elements such as buttons, navigation links and section details.

I also selected Space Grotesk and Inter as the main fonts. Space Grotesk is used for headings because it gives the website a modern creative appearance, while Inter is used for normal paragraphs and other content because it is easy to read.

I started styling the website header, navigation menu, hero sections, images, buttons, forms and footer. I added borders and spacing to separate the different sections and make the content easier to understand. I also worked on responsive design so that the website could adjust to smaller screens.

One of the challenges I experienced during this stage was making the images fit properly inside the different sections. Some photographs appeared too large because their original dimensions were being used. I had to adjust the image containers, set appropriate heights and use object-fit so that the photographs could fit into their spaces without stretching.

I also realised that using the same image arrangement on every page made the website look repetitive. I therefore started using different image and text arrangements, especially on the About and Services pages. I wanted some photographs to appear on the left and others on the right, while keeping the information organised.

The portfolio page also needed improvement. I changed the gallery layout to display photographs in smaller cards with category names and descriptions. This made it easier to browse the photographs and gave the portfolio a more organised appearance.

Part 3: JavaScript and Interactive Features

During Part 3, I started improving the functionality of the website by adding JavaScript and jQuery features. I wanted visitors to do more than simply read information and click links. I wanted the website to have interactive elements that made browsing more convenient.

I added a feature that highlights the current page in the navigation menu. This helps visitors identify which section of the website they are viewing. I also added a scroll reveal effect so that sections can appear as visitors move down the page.

On the Services page, I added a Frequently Asked Questions section using jQuery. Visitors can click on a question to reveal its answer. I arranged the accordion so that when a new question is opened, the previously opened answer closes.

On the Portfolio page, I worked on category filters. These allow visitors to view photographs according to categories such as crew, lighting, drone, sound, stage and photography. I also added a lightbox feature that allows visitors to click on a photograph and view it in a larger format.

I worked on adding a short introduction using the CineMe Productions logo. The purpose was to display the company logo when someone first opens or refreshes the website. During development, I adjusted the behaviour because I did not want the logo to appear again every time someone moved between the website pages.

I also worked on the Contact page and its location map. I initially used an embedded Google Maps map, which was a straightforward way of displaying the Johannesburg location. I later experimented with Leaflet and OpenStreetMap, but this introduced additional files and dependencies. I decided to return to the original Google Maps iframe method because it suited the website and was simpler to maintain.

Problems I Experienced and How I Solved Them

One of the problems I experienced throughout development was incorrect image paths. Some of my images were not appearing because the relative paths were different depending on where the HTML page was stored. I learned that the homepage and pages inside the navigation folder require different paths to access the same images. I checked the folder structure and corrected the paths so that each page could locate its photographs.

Another problem was that some photographs appeared too large and affected the layout of the website. I discovered that the original image dimensions were influencing how the photographs appeared. I worked on setting fixed image heights, controlling the width of image containers and using object-fit to make the photographs fit properly. This was particularly important on the Services and Portfolio pages.

The Portfolio page also required a number of changes. At first, the photographs did not have a consistent layout, and some images appeared wider than others. I changed the gallery to use a grid layout with cards of similar sizes. I also added category labels and descriptions so that visitors could understand the type of work displayed in each photograph.

I experienced problems with the logo introduction as well. The logo did not initially appear because the actual filename contained an extra PNG extension. The JavaScript was looking for a different filename, which meant that it could not locate the image. I also discovered that the logo animation code had been placed in more than one JavaScript file. This caused the animation logic to become duplicated. I learned that keeping separate JavaScript files for different responsibilities makes the project easier to manage.

The Contact page map was another feature that required troubleshooting. I initially used Google Maps, then changed the method to Leaflet, but the map did not behave as expected. I decided that returning to the Google Maps iframe was the better option for my project because it was the method I had already used and it did not require the additional Leaflet setup.

I also experienced a problem with the portfolio category filters. The JavaScript needed to find category information in the HTML, but the original code and HTML did not always use the same element to store the category. I had to check how the category attributes were added and make the JavaScript selectors match the HTML structure.

These problems helped me understand that a website can have correct-looking HTML but still experience issues when its CSS, JavaScript and file paths do not work together. I learned to check the relationship between the files instead of changing only one part without understanding how it connects to the rest of the project.

Testing and Evaluation

Throughout the development process, I tested the website by opening it in a browser and checking how the different pages appeared. I used Visual Studio Code to edit the files and Live Server to view the changes during development.

I checked whether the navigation links opened the correct pages and whether the images displayed using their correct file paths. I also checked the appearance of the website after changing the CSS, especially the spacing, image sizes, borders, fonts and section layouts.

For the interactive features, I checked whether the FAQ questions could open and close, whether the portfolio category filters could select different categories and whether photographs could open in the lightbox. I also worked on checking the logo introduction and the behaviour of the website when moving between pages.

I checked the Contact page map after changing its implementation. The Google Maps iframe requires an internet connection to load the embedded map. The location shown is Johannesburg, South Africa, and it should not be understood as the exact address of a CineMe Productions studio.

I also considered how the website would appear on different screen sizes. I used CSS media queries to adjust the gallery, images, navigation, forms and page sections for smaller screens. This helped me make the layout more suitable for visitors using tablets and mobile phones.

I used JavaScript syntax checking and CSS parsing checks during development to identify code errors. I also checked the local image, stylesheet and JavaScript paths against the project folders. These checks helped me identify problems, although I understand that browser testing is still necessary to confirm that the interactive features work correctly.

 Tools and Technologies Used

I used HTML5 to create the structure and content of the website and CSS3 to control the appearance, layout, colours, fonts and responsive design. I used JavaScript to add interactive features and jQuery to support the FAQ accordion and portfolio filtering. I also used Google Fonts to include Space Grotesk and Inter.

Visual Studio Code was my main development environment. I used Live Server to preview the website in a browser while making changes. I also used GitHub to store the project and document its development. The website uses a Google Maps iframe for its embedded location map.

 Current Project Structure

I organised the project into separate folders so that the files would be easier to manage. The main folder contains the homepage and the README documentation. The CSS folder contains the website stylesheet, while the Java folder contains the JavaScript files. The Images folder contains the photographs and the company logo. The Navigation folder contains the About, Services, Portfolio and Contact pages.

I decided to keep this structure because it separates the different parts of the website and makes it easier to locate and update individual files. It also means that I can make changes to the website styling without having to rewrite the HTML content on every page.
Current Limitations and Future Improvements

Although I have added different features to the website, there are still areas that need further development. The contact form currently displays the required fields and performs basic browser validation, but it is not connected to an email service or backend. This means that it does not currently send enquiries to CineMe Productions.

The map displays Johannesburg but does not identify a verified studio address. This would need to be updated if the company has a confirmed physical location.

I would also like to continue adding genuine production photographs and examples of completed work to the portfolio. This would make the website more representative of the company's creative activities.

I also need to continue testing the website after making changes. This is important because correcting one feature can sometimes affect another part of the website. I want to make sure that the navigation, photographs, filters, lightbox, FAQ and map continue working together.

What I Learned from the Project

Working on CineMe Productions has helped me understand that building a website involves more than writing HTML and CSS. I learned that the structure, styling, images and JavaScript functionality must work together to create a complete website.

I also learned the importance of organising files properly and checking image paths. A small mistake in a filename or folder path can prevent an image or script from loading. I learned that CSS needs to be planned carefully because a general styling rule can sometimes affect a page in an unexpected way.

Another important lesson was the need to test the website regularly. When something did not work, I had to go back to the relevant file, inspect the code and understand why the problem occurred. This helped me become more comfortable with identifying errors and making improvements.

The project has developed from a basic website with five connected HTML pages into a more detailed film production website with a consistent visual identity, organised content, responsive layouts and interactive features. I have continued improving the website throughout Parts 1, 2 and 3, and I see the project as an ongoing learning process.

Conclusion

CineMe Productions has allowed me to apply the web development skills I have learned throughout the assignment. I started by creating the HTML structure, then developed the visual design using CSS and later added interactive features using JavaScript and jQuery.

The development process involved testing, identifying problems and making changes to improve the website. Not every method I tried worked as expected, but these experiences helped me understand how different web technologies connect.

I am continuing to improve the website by refining its layout, checking its functionality and making sure that visitors can easily find information about CineMe Productions and its services.

Project: CineMe Productions Website

Course: Web Development

Development Environment: Visual Studio Code

Project Status: completed and running successfully 
