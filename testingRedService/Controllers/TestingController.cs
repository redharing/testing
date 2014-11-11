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

        // GET api/testing/testCount
        public string GettestCount(string manganame, int page1)
        {
            int chapterPerPage = 20;
            var data = (from manga in db.Mangas
                        join
                        chapter in db.MangaChapters on manga.Id equals chapter.MangaId
                        where manga.Name.Equals(manganame, StringComparison.InvariantCultureIgnoreCase)
                        select chapter);

            int count = data.Count();
            if ((page1 * chapterPerPage) > count)
            {
                if (count - chapterPerPage <= 0)
                {
                    return count.ToString() ;
                }
                else
                {
                    return (count - chapterPerPage ).ToString() + "k";
                }
            }
            else
            {
                return ((page1 - 1) * chapterPerPage).ToString() + "kk";
            }
        }

        // GET api/GetMangaByPage
        public IQueryable<Manga> GetMangaByPage(string spage)
        {
            if (!string.IsNullOrEmpty(spage))
            {
                int page = int.Parse(spage);
                int mangaPerPage = 1000;
                var data = db.Mangas;
                int count = data.Count();
                if ((page * mangaPerPage) > count)
                {
                    if (count - mangaPerPage <= 0)
                    {
                        return db.Mangas;
                    }
                    else
                    {
                        var result = db.Mangas.OrderBy(m => m.Name).Skip(count - mangaPerPage).Take(mangaPerPage);
                        return result;
                    }
                }
                else
                {
                    var result = db.Mangas.OrderBy(m => m.Name).Skip((page - 1) * mangaPerPage).Take(mangaPerPage);
                    return result;
                }
            }
            return null;
        }

        //public string[] GetHotLastest()
        //{
        //    var result = (from p in db.MangaImages
        //                 group p by p.MangaId
        //                     into g
        //                     select new
        //                     {
        //                         u = (from p2 in g select p2.Chapter).Max()
        //                     }).ToArray();
        //    var k = result;
        //    return null;
        //}

        string[] hotmanga = { "onepiece", "naruto", "bleach", "toriko", "attack-on-titans" };
        //public IQueryable<Manga> GetHotManga()
        //{
        //    var result = from p in db.Mangas
        //                 where hotmanga.Contains(p.Name)
        //                 select p;
        //    return result;
        //}

        public IQueryable<NewReleaseManga> GetHotReleaseManga()
        {
            var result = from p in db.NewReleaseMangas
                         where hotmanga.Contains(p.MangaName)
                         select p;
            return result;
        }

        // GET api/testing/GetMangaChapterByPage
        public IQueryable<MangaChapter> GetMangaChapterByPage(string manganame, int page)
        {
            int chapterPerPage = 100;
            var data = (from manga in db.Mangas
                       join
                       chapter in db.MangaChapters on manga.Id equals chapter.MangaId
                       where manga.Name.Equals(manganame, StringComparison.InvariantCultureIgnoreCase)
                       select chapter);

            int count = data.Count();
            if ((page * chapterPerPage) > count)
            {
                if (count - chapterPerPage <= 0)
                {
                    return data;
                }
                else
                {
                    var result = data.OrderByDescending(d => d.ChapterId).Skip(count - chapterPerPage).Take(chapterPerPage);
                    return result;
                }
            }
            else
            {
                var result = data.OrderByDescending(d => d.ChapterId).Skip((page - 1) * chapterPerPage).Take(chapterPerPage);
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