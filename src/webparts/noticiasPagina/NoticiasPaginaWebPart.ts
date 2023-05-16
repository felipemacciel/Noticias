import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'NoticiasPaginaWebPartStrings';
import NoticiasPagina from './components/NoticiasPagina';
import { INoticiasPaginaProps } from './components/INoticiasPaginaProps';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

export interface INoticiasPaginaWebPartProps {
  listID: string;
}

export default class NoticiasPaginaWebPart extends BaseClientSideWebPart<INoticiasPaginaWebPartProps> {


  public render(): void {
    const element: React.ReactElement<INoticiasPaginaProps> = React.createElement(
      NoticiasPagina,
      {
        listID: this.properties.listID,
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
