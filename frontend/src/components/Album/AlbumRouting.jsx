import { Navigate, Route, Routes } from "react-router-dom"
import { Album } from "../../pages";
import { Spinner } from '..'
import { useGetAlbums } from "../../hooks";
import { createSlug } from "../../utils";
import { AppLayout } from "../../Layouts";

const AlbumRouting = () => {
    const { albums } = useGetAlbums();

    if (albums.length === 0) return <Spinner message={'Loading albums'} />

    return (
        <AppLayout>
            <Routes>
                {
                    albums.length > 0 && albums?.map(( album ) => (
                        <Route 
                            key={ album.id }
                            path={`${ createSlug(album?.name )}`} 
                            element={ <Album album={ album } /> }  
                        />
                    ))
                }
                <Route path='*' element={ <Navigate to='/' /> } />
            </Routes>
        </AppLayout>
    )
}
export default AlbumRouting