# Video Game Sales

## Summary

#### Description
Our data science group project depicts video game sales from the 1980s to 2016. Users can utilize a drop-down menu to view data by region and see how sales varied by genre, publisher, platform, ESRB Rating, critic scores, user scores, and year.

#### Motivation
For this project, we were prompted to create a business presentation. We were allowed to use any data and pick any industry, so we chose something that made us all excited and a bit nostalgic: video games. Once we found our [dataset](https://www.kaggle.com/rush4ratio/video-game-sales-with-ratings), we wanted to be able to answer questions about which types of games had the highest sales.

#### Result
Using a flask app and D3.js we were able to pull data from the csv file and create various sales charts. A drop-down menu on the page allows the user to toggle between the following regions: Global, North American, European, Japanese, and Other. Making a selection then reveals graphs depicting sales against a number of variables. Users can then gain an understanding of which types of video games fare best in different regions of the world.

#### Team Efforts
Kevin was responsible for creating the flask app and adding CSS styling to our page. Myke was responsible for pulling findings from the data to report in our business presentation. I was responsible for creating the D3 charts and organizing them in the HTML page. 

#### Individual Responsibilities
* Use plotly to build pie chart for sales by genre.
* Use plotly to build bar chart for sales by genre.
* Use plotly to build bar chart for sales by publisher.
* Use plotly to build bar chart for sales by platform.
* Use plotly to build pie chart for sales by ESRB Rating.
* Use plotly to build scatter plot for sales by critic scores.
* Use plotly to build scatter plot for sales by user scores.
* Create HTML page. 
* Use bootstrap to display charts and drop-down menu.

#### Challenges
When we first plotted sales by genre in both a pie chart and a bar graph, the two visualizations displayed different results. Despite being based off the same data, the two charts were showing different genres as producing the most sales. This meant that at least one chart was wrong. After some digging we found that plotly was summing total sales in the pie chart, but was displaying only the first value for each genre in the bar graph. Because we needed sums in our bar graph too, we used this knowledge to search for an aggregation function, added it to our data code, and produced a graph that was more accurate. If we had taken plotly for granted, we would have misrepresented what was actually happening in our data.

#### Improvements
In the future, we'd like to enahnce our visualizations - perhaps with the help of Tableau - to bring more depth, interactivity, and beauty. We would also like to incorporate other relevant data, such as online gaming data, as well as statistical analyses to paint a more accurate picture of the market.


## Take a look for yourself!

#### Step 1
* Download all the files and folders in this repo.

#### Step 2
* Open the app.py file in a code editor (I used Visual Studio Code).

#### Step 3
* Use the command line to run the file:
* python app.py

#### Step 4
* Use Cmd + click (or Ctrl + click for PC) on the local server link. It should look something like this:
* http://127.0.0.1:5000/

#### Step 5
* This should automatically open the project in a tab in your web browser.
* If not, you can copy and paste the local server link into your browser.

#### Step 6
* Use the drop-down menu to view sales in different regions.



