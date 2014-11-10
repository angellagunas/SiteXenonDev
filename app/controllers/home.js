var homeController=function(server){
	server.route('/').
		get(function(req,res){
			res.end('Hello node!');
		});
}

module.exports = homeController;