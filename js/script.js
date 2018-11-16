const PROJECTS_JSON = {
    projects: [
        {
            "name": "Deep Learning",
            "category": ["Python", "PyTorch"],
            "description": "Exercises from <b>Intro to Deep Learning with PyTorch</b> by Udacity which I received as a scholarship to compete for complete Deep Learning Nanodegree.",
            "link": "https://github.com/AbhishekChd/DeepLearning",
            "image": "./img/deep-learning-pytorch.png"
        },
        {
            "name": "News App",
            "category": ["Android"],
            "description": "Latest News Headlines from different categories - Business,Technology and more! Save the news you like and view anytime.",
            "link": "https://github.com/AbhishekChd/NewsApp",
            "image": "./img/news.png"
        },
        {
            "name": "Cineverse",
            "category": ["Android"],
            "description": "See Latest Popular and Top Rated movies, and their synopsis, trailers and ratings. Save the movies you like and see later!",
            "link": "https://github.com/AbhishekChd/Cineverse",
            "image": "./img/cineverse.png"
        },
        {
            "name": "Sudoku Solver",
            "category": ["Python", "AI"],
            "description": "Solve upto hard problems by inputting a problem in String format replacing empty boxes with <code>`.`</code> Made as part of Udacity's Project in AI Nanodegree Preview",
            "link": "https://github.com/AbhishekChd/Sudoku-Solver",
            "image": "img/sudoku.png"
        }
    ]
};
const PROJECT_TEMPLATE =
    `<div class="col-sm-10 col-md-4 col-lg-4 mb-5 offset-sm-1 offset-md-0">
            <a target="_blank" class="silent-link"><div class="card mb-0" style="cursor: pointer; height: 100%">
            <div class="card-header">
            <h3></h3>
                <h4 id="badges-holder"></h4>
            </div>
                <div class="flex-row"><img class="img-fluid d-block m-auto" style="height: 300px" alt="Card image" src=""></div>
                <div class="card-body">
                    <p class="card-text text-justify"></p>                                      
                </div>  
            </div>
            </a>
        </div>`;


let renderItem = function (item) {
    let card_template = $(PROJECT_TEMPLATE);
    let badges = item.category.map(value => {
        return `<span class="badge badge-primary badge-pill mr-2">${value}</span>`;
    });

    card_template.find("img").attr({
        src: item.image,
    });
    card_template.find("a").attr({
        href: item.link
    });
    card_template.find("p").html(item.description);
    card_template.find("h3").html(item.name);
    card_template.find("#badges-holder").html(badges);
    return card_template;
};

function showData() {
    let results = PROJECTS_JSON.projects.map(value => {
        return renderItem(value)
    });
    $("#projects>div.row").html(results);
}