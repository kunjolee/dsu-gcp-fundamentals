import { NotHaveMessage } from '../../components';
import { useGetPhotos } from '../../hooks'
import { MasonryLayout } from '../../Layouts'


const HomePage = () => {
  const { photos } = useGetPhotos();


  return photos.length > 0 ? (
    <MasonryLayout photos={ photos }/>
  ) : (  
    <NotHaveMessage message={`You don't have images now! Go and create one`} />
  )
}
export default HomePage