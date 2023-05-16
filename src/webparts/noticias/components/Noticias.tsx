import * as React from 'react';
import { Header } from '../../../components/Header';
import { Bookmark } from '../../../Icons/Bookmark';
import { INoticiasProps } from './INoticiasProps';
import { CaretRight } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { sp } from '@pnp/sp'
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';

interface newsData {
  Title: string;
  descricao: string;
  imageUrl: string;
  linkNoticia: string;
}

export default function Noticias(props: INoticiasProps): JSX.Element {
  const [data, setData] = useState<newsData[]>([])
   useEffect(() => {
    if (props.listID) {
      const webUrl = window.location.protocol + "//" + window.location.hostname + "/" + window.location.pathname.split('/')[1] + "/" + window.location.pathname.split('/')[2]
      sp.setup({
        sp: {
          headers: {
            Accept: "application/json;odata=verbose",
          },
          baseUrl: webUrl
        },
      });
      sp.web.lists.getById(props.listID).items.top(4).orderBy('Created', true)()
        .then((data: newsData[]) => {
            setData(data) 
        })
        .catch((er:any) => {
          console.log(er)
        })
    } 
  }, [props.listID])
  return (
        <div className='newsBox'>
          <a href={props.titleUrl} className="titleNews" target="_self" rel="noopener noreferrer" data-interception="off">
            <Header.Root>
              <Header.Icon>
                <Bookmark width={14} height={18} />
              </Header.Icon>
              <div style={{ marginLeft: '12px', marginRight: '16px' }}>{props.titleSection}</div>
              <Header.Icon>
                <CaretRight size={24} />
              </Header.Icon>
            </Header.Root>
          </a>
          {data.map((item, index) => {
            return (
              item.linkNoticia ? <a target="_blank" rel="noopener noreferrer" data-interception="off" className='titleNews' href={item.linkNoticia}>
                <div key={index} className="cardNews">
                  <img className="cardNewsImg" src={item.imageUrl} />
                  <div className='cardNewsContent'>
                    <div className='cardNewsTitle'>
                      {item.Title}
                    </div>
                    <div className='cardNewsDescription'>
                      {item.descricao}
                    </div>
                  </div>
                </div>
              </a> :
                <div key={index} className="cardNews">
                  <img className="cardNewsImg" src={item.imageUrl} />
                  <div className='cardNewsContent'>
                    <div className='cardNewsTitle'>
                      {item.Title}
                    </div>
                    <div className='cardNewsDescription'>
                      {item.descricao}
                    </div>
                  </div>
                </div>
            )
          })}
        </div>
  )

}