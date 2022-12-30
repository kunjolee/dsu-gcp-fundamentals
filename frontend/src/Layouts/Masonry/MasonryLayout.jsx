import Masonry from 'react-masonry-css'
import { PhotoCard } from '../../components';

import './MasonryLayout.css'

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ photos = [] }) => {
  return (
    <Masonry
      className="masonry"
      breakpointCols={breakpointObj}
    >
      {
        photos?.map( (photo, i) => (
          <PhotoCard key={ i } photo={ photo } />
        ))
      }
    </Masonry>
  )
}
export default MasonryLayout