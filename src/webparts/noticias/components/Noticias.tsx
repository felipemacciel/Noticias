import * as React from 'react';
import { INoticiasProps } from './INoticiasProps';
import { useEffect} from 'react';
import { sp } from '@pnp/sp'
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import Loading from 'react-loading';
import '../../noticiasPagina/components/NoticiasPagina.css'

interface newsData {
  Title: string;
  CanvasContent1: string;
  FirstPublishedDate: string;
  FileLeafRef: string;
  BannerImageUrl: {
    Url: string;
  };
  linkNoticia: string;
}

export default function Noticias(props: INoticiasProps): JSX.Element {
  
  const [news, setNews] = React.useState<newsData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [count, setCount] = React.useState<number>(3);
   useEffect(() => {
    sp.setup({
      sp: {
        headers: {
          Accept: "application/json;odata=verbose",
        },
        baseUrl: props.absoluteUrl
      },
    });
    sp.web.lists.getByTitle('Páginas do site').items.select('*, FileLeafRef').top(2000).filter(`FirstPublishedDate ge datetime'${new Date(new Date().setMonth(-1)).toISOString()}' and FirstPublishedDate le datetime'${new Date().toISOString()}' and PromotedState eq 2`)()
      .then((data: any[]) => {
        console.log(data)
        setNews(data)
        setLoading(false);
      })
      .catch((er) => {
        console.log(er);
        setLoading(false);
      })
  }, [props.listID])
  return (
        <div className='newsBox'>    
            <div className="header-news">           
              <div>{props.titleSection}</div>     
              <a href={props.titleUrl} className="titleNews more" target="_self" rel="noopener noreferrer" data-interception="off">Ver tudo </a>         
            </div>        
            {loading ?
        <div className='last-access-loading-container'>
          <Loading type='spin' height='36px' width='36px' color='#1B7754' />
        </div>
        :
        <>
          {news.map((item, index) => {
            if (index > count) { return }
            return (
              <div key={index} className='paginaNoticiasContainer' style={{ marginBottom: '15px' }}>
                <a target="_blank" rel="noopener noreferrer" data-interception="off" className='titleNews' href={item.FileLeafRef}>
                  <div className="cardNews">
                    <img className="cardNewsImg" src={item.BannerImageUrl.Url} />
                    <div className='cardNewsContent'>
                      <div className='cardNewsTitle'>
                        {item.Title}
                      </div>
                      <div className='cardNewsDescription' dangerouslySetInnerHTML={{__html: item.CanvasContent1}}/>              
                      {setCount}        
                    </div>
                  </div>
                </a>
              </div>
            )
          })}
        </>
      }
        </div>
  )

}
