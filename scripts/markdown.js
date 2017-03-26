function abc() {
    console.log('x');
}
class Root extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            value:'TEST',
            display:'TEST'
        }
        this.handleTextArea = this.handleTextArea.bind(this);
    };

    handleTextArea(e){
        console.log('hi');
        var display = marked(e.target.value);
        this.setState({
            value: e.target.value,
            display: display
        });
        console.log(this.state.value);
    };
    
    render (){
        console.log('Hi!');
        const followMe = this.state.display;
        console.log('FM ', followMe);
        return (
        <div>
            <textarea value={this.state.value} onChange={this.handleTextArea}/>
            <pre>{followMe}</pre>
        </div>
        );
    }
}
ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
