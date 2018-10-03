import Form from '@de-re-crud/core/form';
import {
  FormSubmissionCallback,
  ICollectionReferences,
  IFieldChangeNotificationParams,
} from '@de-re-crud/core/form/form.props';
import Logger from '@de-re-crud/core/logger';
import { IRendererOptions } from '@de-re-crud/core/models/renderer-options';
import {
  FieldChangeEvent,
  GenericEventTarget
} from '@de-re-crud/core/models/renderers';
import combineCssClasses from '@de-re-crud/core/utils/combine-css-classes';
import Bootstrap3RendererOptions from '@de-re-crud/renderer-bootstrap3/options';
import Bootstrap4RendererOptions from '@de-re-crud/renderer-bootstrap4/options';
import { Component, h } from 'preact';
import schemJson from './schema.json';
import './style.css';

interface IRenderer {
  cssFile: string;
  name: string;
  options: IRendererOptions;
  selectClassName: string;
  title: string;
}

const renderers: IRenderer[] = [
  {
    cssFile: 'node_modules/bootstrap/dist/css/bootstrap.css',
    name: 'bootstrap4',
    options: Bootstrap4RendererOptions,
    selectClassName: 'custom-select',
    title: 'Bootstrap 4'
  },
  {
    cssFile: 'node_modules/bootstrap3/dist/css/bootstrap.css',
    name: 'bootstrap3',
    options: Bootstrap3RendererOptions,
    selectClassName: 'form-control',
    title: 'Bootstrap 3'
  }
];

interface IState {
  renderer: string;
}

export default class App extends Component<{}, IState> {
  public state: IState = {
    renderer: renderers[0].name
  };

  private cssLinkEl?: Element;

  private get renderer() {
    return renderers.find((x) => x.name === this.state.renderer);
  }

  private collectionReferences: ICollectionReferences = {
    field: ({ formValue: { fields } }) => fields
  };

  public componentDidMount() {
    this.updateCss();
  }

  public componentDidUpdate() {
    this.updateCss();
  }

  public render() {
    const renderer = this.renderer;

    return (
      <div className={combineCssClasses('container', renderer.name)}>
        <div className="row">
          <div className="col-sm-4 renderer-select">
            <select
              class={renderer.selectClassName}
              onChange={this.onRendererChange}
            >
              {renderers.map((x) => (
                <option
                  value={x.name}
                  selected={x.name === this.state.renderer}
                >
                  {x.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <hr />

        <div className="row">
          <div class="col-sm-8">
            <Form
              schema={schemJson}
              struct="struct"
              collectionReferences={this.collectionReferences}
              rendererOptions={renderer.options}
              onFieldChange={this.onFieldChange}
              onFieldChangeType="change"
              onFieldParentChange={this.onFieldParentChange}
              onSubmit={this.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }

  private onRendererChange = (e: FieldChangeEvent) => {
    this.setState({
      renderer: (e.target as GenericEventTarget).value as string
    });
  };

  private onFieldChange = (params: IFieldChangeNotificationParams) => {
    Logger.debug('field changed', params);
  };

  private onFieldParentChange = (params: IFieldChangeNotificationParams) => {
    Logger.debug('field parent changed', params);
  }



  private onSubmit = (_: object, cb: FormSubmissionCallback) => {
    cb();
  };

  private updateCss = () => {
    const renderer = this.renderer;

    if (!this.cssLinkEl) {
      const el = document.createElement('link');
      el.setAttribute('rel', 'stylesheet');
      el.setAttribute('type', 'text/css');
      el.setAttribute('href', renderer.cssFile);
      document.getElementsByTagName('head')[0].appendChild(el);
      this.cssLinkEl = el;
    } else {
      this.cssLinkEl.setAttribute('href', renderer.cssFile);
    }
  };
}
