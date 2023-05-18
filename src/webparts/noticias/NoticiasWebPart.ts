/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration, PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';


import * as strings from 'NoticiasWebPartStrings';
import Noticias from './components/Noticias';
import { INoticiasProps } from './components/INoticiasProps';

export interface INoticiasWebPartProps {
  listID: string;
  titleUrl: string;
  titleSection: string;
}

export default class NoticiasWebPart extends BaseClientSideWebPart<INoticiasWebPartProps> {

  public render(): void {
    const element: React.ReactElement<INoticiasProps> = React.createElement(
      Noticias,
      {
        listID: this.properties.listID,
        titleUrl: this.properties.titleUrl,
        context: this.context,
        titleSection: this.properties.titleSection,
        absoluteUrl: this.context.pageContext.site.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('titleSection', {
                  label: 'Insira o título: '
                }),
                PropertyPaneTextField('titleUrl', {
                  label: 'Insira a url da página de notícias: '
                }),
                PropertyFieldListPicker('listID', {
                  label: 'Selecione a lista:',
                  selectedList: this.properties.listID,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context as any,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
