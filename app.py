import os

import pandas as pd
import numpy as np

import sqlalchemy as db
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

#SQLAlchemy
engine = db.create_engine('sqlite:///vg_data.sqlite')
connection = engine.connect()
metadata = db.MetaData()
vg_data = db.Table('VG_Sales', metadata, autoload=True, autoload_with=engine)

session = Session(engine)
inspector = inspect(engine)

sql = SQLAlchemy(app)

#Get Columns
columns = inspector.get_columns('VG_Sales')
colList = [d['name'] for d in columns if 'name' in d]

#Read In CSV
csv = pd.read_csv("VG_Sales.csv")

df = pd.DataFrame(csv)


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")



@app.route("/region")
def region():
    """Return a list of regions."""

    return jsonify(colList[5:10])



@app.route("/sales/<region>")
def sales(region):
    
    df = pd.DataFrame(csv)

    clean_data = df.dropna(how='any')

    # Format the data to send as json
    data = {
        "platform": clean_data.Platform.tolist(),
        "year_release": clean_data.Year_of_Release.values.tolist(),
        "genre": clean_data.Genre.tolist(),
        "publisher": clean_data.Publisher.tolist(),
        "region": clean_data[region].tolist(),
        "critic_score": clean_data.Critic_Score.values.tolist(),
        "user_score": clean_data.User_Score.values.tolist(),
        "rating": clean_data.Rating.tolist(),
    }
    return jsonify(data)
    


@app.route("/year_sales/<sales_region>")
def year(sales_region):
    
    df = pd.DataFrame(csv)

    clean_data = df.dropna(how='any')

    group_data = clean_data.groupby(["Year_of_Release"]).sum()

    group_data['Year_of_Release'] = group_data.index
    
    # Format the data to send as json
    sum_data = {
        "year": group_data.Year_of_Release.tolist(),
        "region": group_data[sales_region].values.tolist()
    }
    return jsonify(sum_data)
    


if __name__ == "__main__":
    app.debug = True
    app.run()
