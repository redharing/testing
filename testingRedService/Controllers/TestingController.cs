using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using testingRedService.Models;

namespace testingRedService.Controllers
{
    public class TestingController : ApiController
    {
        private mangaEntities db = new mangaEntities();

        //// GET api/Testing
        //public IQueryable<MangaImage> GetMangaImages()
        //{
        //    return db.MangaImages;
        //}

        // GET api/MangaByMangaChapter
        public string[] GetMangaImages(string manganame, string schapter)
        {
            if (string.IsNullOrEmpty(manganame) || string.IsNullOrEmpty(schapter))
            {
                return null;
            }

            int chapter = int.Parse(schapter);
            var result = (from manga in db.Mangas
                         join image in db.MangaImages on manga.Id equals image.MangaId
                          where manga.Name.Equals(manganame, StringComparison.InvariantCultureIgnoreCase) && image.Chapter == chapter
                         select image.ImagePath).ToArray();

            return result;
        }

        // GET api/MangaByPage
        public IQueryable<Manga> GetMangaByPage(int page)
        {
            int mangaPerPage = 20;
            var data = db.Mangas;
            var count = data.Count();
            if (page * mangaPerPage > count)
            {
                if (count - mangaPerPage < 0)
                {
                    return db.Mangas;
                }
                else
                {
                    var result = db.Mangas.Skip(count - mangaPerPage).Take(mangaPerPage);
                    return result;
                }
            }
            else
            {
                var result = db.Mangas.Skip(page - 1 * mangaPerPage).Take(mangaPerPage);
                return result;
            }
        }

        // GET api/angaChapterByPage
        public IQueryable<MangaChapter> GetMangaChapterByPage(string manganame, int page)
        {
            int chapterPerPage = 20;
            var data = from manga in db.Mangas
                       join
                       chapter in db.MangaChapters on manga.Id equals chapter.MangaId
                       where manga.Name.Equals(manganame,StringComparison.InvariantCultureIgnoreCase)
                       select chapter;

            var count = data.Count();
            if (page * chapterPerPage > count)
            {
                if (count - chapterPerPage < 0)
                {
                    return data;
                }
                else
                {
                    var result = data.Skip(count - chapterPerPage).Take(chapterPerPage);
                    return result;
                }
            }
            else
            {
                var result = data.Skip(page - 1 * chapterPerPage).Take(chapterPerPage);
                return result;
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

       
    }
}