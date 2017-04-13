let render = ReactDOM.render;
let browserHistory = ReactRouter.hashHistory;
let Router = ReactRouter.Router;
let Route = ReactRouter.Route;
let IndexRoute = ReactRouter.IndexRoute;
let Link = ReactRouter.Link;


render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<Route path="products" component={Products}/>
			<Route path="customers" component={Customers}/>
			<Route path="invoices" component={Invoices}/>
		</Route>
	</Router>
), document.getElementById('app'))