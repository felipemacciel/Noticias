import * as React from 'react';
import { INoticiasPaginaProps } from './INoticiasPaginaProps';
import { sp } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import Loading from 'react-loading';
import { Plus } from 'phosphor-react';
import './NoticiasPagina.css'

interface newsData {
  Title: string;
  descricao: string;
  imageUrl: string;
  linkNoticia: string;
  Id: number;
  data: string;
}

export default function NoticiasPagina(props: INoticiasPaginaProps): JSX.Element {
  const [news, setNews] = React.useState<newsData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [count, setCount] = React.useState<number>(3);
  const monthsArray = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  React.useEffect(() => {
    const webUrl = window.location.protocol + "//" + window.location.hostname + "/" + window.location.pathname.split('/')[1] + "/" + window.location.pathname.split('/')[2]
    sp.setup({
      sp: {
        headers: {
          Accept: "application/json;odata=verbose",
        },
        baseUrl: webUrl
      },
    });
    sp.web.lists.getById(props.listID).items.top(2000).filter(`data ge datetime'${new Date(new Date().setDate(-30)).toISOString()}' and data le datetime'${new Date().toISOString()}'`).orderBy('data', false)()
      .then((data: newsData[]) => {
        setNews(data)
        setLoading(false);
      })
      .catch((er) => {
        console.log(er);
        setLoading(false);
      })
  }, [props.listID])

  const addMoreNews = (_event: React.MouseEvent<HTMLButtonElement>): void => {
    setCount(prev => prev + 5)
  }


  return (
    <>
    <a target="_blank" rel="noopener noreferrer" data-interception="off" className='btn-add-news' href={"https://suportvrconsult.sharepoint.com/sites/Dev/_layouts/15/listform.aspx?PageType=8&ListId=%7BE1C48BE5-A852-47A5-ACDF-FAD9B2946275%7D&RootFolder=%2Fsites%2FDev%2FLists%2FNoticias&Source=https%3A%2F%2Fsuportvrconsult.sharepoint.com%2Fsites%2FDev%2FLists%2FNoticias%2FAllItems.aspx&ContentTypeId=0x01006262C50830C2B64FB017D09DF157B900002191983192577E439E5D378F23339C00"}><Plus/> Adicionar</a>
      {loading ?
        <div className='last-access-loading-container'>
          <Loading type='spin' height='36px' width='36px' color='#1B7754' />
        </div>
        :
        <>
          {news.map((item, index) => {
            if (index > count) { return }
            return (
              <div key={index} className='paginaNoticiasContainer' style={{  marginBottom: '15px'}}>                   
                <a target="_blank" rel="noopener noreferrer" data-interception="off" className='titleNews' href={item.linkNoticia}>
                  <div className="cardNews">
                    <img className="cardNewsImg" src={item.imageUrl} />
                    <div className='cardNewsContent'>
                      <div className='cardNewsTitle'>
                        {item.Title}
                      </div>
                      <div className='cardNewsDescription'>
                        {item.descricao}
                      </div>
                      <div className='cardNewsDate'>
                      Postado {new Date(item.data).getDate()} de {monthsArray[new Date(item.data).getMonth()]} de {new Date(item.data).getFullYear()}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            )
          })} {count < news.length ?
            <div className="btn-load">
              <button className="calendar-load-more-btn" onClick={addMoreNews}>
                Carregar mais
                <Plus />
              </button>
            </div> : null}
        </>
      }
    </>
  )
}
