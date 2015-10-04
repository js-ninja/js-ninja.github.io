/** @jsx React.DOM */


/***
* Project component
*/
var Project = React.createClass({
  render:function(){
    /* jshint ignore:start */
    return <div className="col-md-offset-3 col-md-6">
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src={this.props.logo || "http://placehold.it/100x100"} alt="..." />
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{this.props.title}</h4>
              {this.props.description}
            </div>
          </div>
        </div>
        <div className="panel-footer text-right">
            { 
              this.props.urls.map(function(url, $index){
                if(url.type && url.link){
                  return <a target="_blank" href={url.link} className="btn btn-default btn-xs" key={$index}>
                    {url.type}
                  </a>
                }
              })
            }
        </div>
      </div>
    </div>
    /* jshint ignore:end */
  }
});


/***
* Project list component
*/
var ProjectList = React.createClass({

  getInitialState: function(){
    return {projects:{}};
  },

  componentDidMount:function(){
    var that = this;

    /* Fetch Data from URL */
    $.get(this.props.dataUrl, function(response){
      that.setState({
        projects:response.data
      });
    });
  },

  render:function(){
    if(this.state.projects.length > 0){
      /* jshint ignore:start */
      return <div>
        {this.state.projects.map(function(project, $index){
          return <Project title={project.title}
                          logo={project.logo}
                          author={project.author} 
                          description={project.description}
                          urls={project.urls}
                          key={$index} />
        })}
      </div>
      /* jshint ignore:end */
    } else {
      /* jshint ignore:start */
      return <div>Loading...</div>;
      /* jshint ignore:end */
    }

  }
});

/* jshint ignore:start */
React.render(<ProjectList dataUrl="/data.json" />, document.querySelector('#project-list'));
/* jshint ignore:end */