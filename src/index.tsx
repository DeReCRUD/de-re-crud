import { h, Component } from 'preact';
import SchemaParser from './core/schema-parser';
import * as schemJson from './schema.json';
import './style';

export default class App extends Component {
  constructor(props) {
    super(props);

    const schema = SchemaParser.parse(schemJson);
    console.log(schema);
  }

	render() {
		return (
			<div>
			</div>
		);
	}
}
