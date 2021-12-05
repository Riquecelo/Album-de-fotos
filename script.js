
class PhotoGallery{
    constructor(){
       this.API_KEI ='563492ad6f91700001000001cc78d8489e40416fb946fc7c0df3fc5b';
       this.galleryDiv = document.querySelector('.gallery');
       this.loadMore = document.querySelector('.load-more');
       this.logo = document.querySelector('.logo');
       this.pageIndex = 1;
       this.searchValueGlobal = '';
       this.eventHandle();
    }

    eventHandle(){
        document.addEventListener('DOMContentLoaded',()=>{
            this.getImg(1);
        });
        
        this.loadMore.addEventListener('click', (e)=>{
            this.loadMoreImages(e);
        });

        this.logo.addEventListener('click',()=>{
            this.pageIndex = 1;
            this.galleryDiv.innerHTML = '';
            this.getImg(this.pageIndex);
        })    
    }

    async getImg(){
        this.loadMore.setAttribute('data-img', 'curated');
        const baseURL ='https://api.pexels.com/v1/curated?page=&per_page=12';
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos)
       // console.log(data);
    }

    async fetchImages(baseURL){
        const response = await fetch(baseURL,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: this.API_KEI
            }
        });
        const data = await response.json();
       // console.log(data);
        return data;
    }

    GenerateHTML(photos){
        photos.forEach(photo => {
            const item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
            <a href='${photo.src.original}' target="_blank">
                <img src="${photo.src.medium}">
                <h3>${photo.photographer}<h3>
            <a>
            `;
            this.galleryDiv.appendChild(item)
        });
    }

    async getMoreSearchedImages(index){
        const baseURL = `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=12`
        const data = await this.fetchImages(baseURL);
        //console.log(data)
        this.GenerateHTML(data.photos);
      }

    loadMoreImages(e){
        let index = ++this.pageIndex;
        const loadMoreData = e.target.getAttribute('data-img');
        if(loadMoreData === 'curated'){
            this.getImg(index)
        }else{
            this.getSearchedImages(index)
        }
    }
}

const gallery = new PhotoGallery;