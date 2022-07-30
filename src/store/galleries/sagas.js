import { put, call, takeLatest } from "redux-saga/effects";
import { getGalleries, getGallery, setGalleries, setGallery, createGallery, editGallery, 
    deleteGallery, setPaginatedGalleries, createComment, deleteComment, 
    setGalleryWithNewComment, setGalleryWithoutComment, setGalleriesWithNewGallery } from "./slice";
import galleryService from "../../services/GalleryService";

function* handleGetGalleries(action){
    try{
        const galleries = yield call(galleryService.getGalleries, action.payload?.page, action.payload?.term, action.payload?.userId);
        if(action.payload?.page > 1){
            yield put(setPaginatedGalleries(galleries));
        } else {
            yield put(setGalleries(galleries));
        }
    } catch (error){
        alert(error.message);
    }
}

function* handleGetGallery(action){
    try {
        const gallery = yield call(galleryService.getGallery, action.payload);
        yield put(setGallery(gallery));
    } catch (error) {
        alert(error.message);
    }
}

function* handleCreateGallery(action){
    try {
        const newGallery = yield call(galleryService.createGallery, action.payload);
        yield put(setGalleriesWithNewGallery(newGallery));
    } catch (error) {
        alert("Title should be at least 2 and at most 255 characters long and images must be in jpg, jpeg or png format");
    }
}

function* handleEditGallery(action){
    try {
        const gallery = yield call(galleryService.editGallery, action.payload.newGallery.galleryId, action.payload.newGallery);
        yield put(setGalleriesWithNewGallery(gallery));
    } catch (error) {
        alert("Title should be at least 2 characters long and images must be in png, jpeg or jpg format!");
    }
}

function* handleDeleteGallery(action){
    try {
        console.log(action);
        yield call(galleryService.deleteGallery, action.payload);
        const galleries = yield call(galleryService.getGalleries, 1, null, null);
        yield put(setGalleries(galleries));
    } catch (error) {
        alert(error.message);
    }
}

function* handleCreateComment(action){
    try {
        console.log(action);
        const newComment = yield call(galleryService.createComment, action.payload.content, action.payload.galleryId);
        yield put(setGalleryWithNewComment(newComment));
    } catch (error) {
        alert("Comment length should not exceed 1000 characters!");
    }
}

function* handleDeleteComment(action){
    try {
        const comment = yield call(galleryService.deleteComment, action.payload)
        yield put(setGalleryWithoutComment(comment));
    } catch (error) {
        alert(error.message);
    }
}

export function* watchGetGalleries(){
    yield takeLatest(getGalleries.type, handleGetGalleries);
}

export function* watchGetGallery(){
    yield takeLatest(getGallery.type, handleGetGallery);
}

export function* watchCreateGallery(){
    yield takeLatest(createGallery.type, handleCreateGallery);
}

export function* watchEditGallery(){
    yield takeLatest(editGallery.type, handleEditGallery);
}

export function* watchDeleteGallery(){
    yield takeLatest(deleteGallery.type, handleDeleteGallery);
}

export function* watchCreateComment(){
    yield takeLatest(createComment.type, handleCreateComment);
}

export function* watchDeleteComment(){
    yield takeLatest(deleteComment.type, handleDeleteComment);
}

