import { Navigate, Route, Routes } from "react-router-dom"
import { Photo } from "../../pages";
import { Spinner } from '..'
import { useGetPhotos } from "../../hooks";
import { AppLayout } from "../../Layouts";

const PhotoRouting = () => {
    const { photos } = useGetPhotos();

    if (photos.length === 0) return <Spinner message={'Loading photos'} />

    return (
        <AppLayout>
            <Routes>
                {
                    photos.length > 0 && photos?.map(( photo ) => (
                        <Route 
                            key={photo.id}
                            path={ `${photo.id}` } 
                            element={ <Photo photo={ photo } /> } 
                        />
                    ))
                }
                <Route path='*' element={ <Navigate to='/' /> } />
            </Routes>
        </AppLayout>
    )
}
export default PhotoRouting