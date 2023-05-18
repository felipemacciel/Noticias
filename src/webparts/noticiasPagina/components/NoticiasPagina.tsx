import * as React from 'react';
import { INoticiasPaginaProps } from './INoticiasPaginaProps';
import { sp } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists'
import '@pnp/sp/items';
import Loading from 'react-loading';
import { Plus } from 'phosphor-react';
import './NoticiasPagina.css';

interface newsData {
  Title: string;
  Id: number;
  FirstPublishedDate: string;
  FileLeafRef: string;
  BannerImageUrl: {
    Url: string;
  };
  CanvasContent1: string;
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

  const addMoreNews = (_event: React.MouseEvent<HTMLButtonElement>): void => {
    setCount(prev => prev + 5)
  }

  return (
    <>
      <a  className='btn-add-news' href={"https://suportvrconsult.sharepoint.com/sites/Dev/_layouts/15/CreatePageFromTemplate.aspx?source=%2Fsites%2FDev&promotedState=1"}><Plus /> Adicionar</a>
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
                      <div className='cardNewsDate'>
                        Postado {new Date(item.FirstPublishedDate).getDate()} de {monthsArray[new Date(item.FirstPublishedDate).getMonth()]} de {new Date(item.FirstPublishedDate).getFullYear()}
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
