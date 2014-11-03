using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.WindowsAzure.Mobile.Service;
using System.Net;
using System.Text;
using System;
using HtmlAgilityPack;
using System.Collections.Generic;
using System.Linq;

namespace testingRedService
{
    // A simple scheduled job which can be invoked manually by submitting an HTTP
    // POST request to the path "/jobs/sample".

    public class SampleJob : ScheduledJob
    {
        public override Task ExecuteAsync()
        {
            Services.Log.Info("Start job!");

            string[] mangaAll = { "onepiece", "naruto" };
            int mangaAllCount = mangaAll.Length;
            foreach (var m in mangaAll)
            {
                Services.Log.Info(string.Format("get html {0}  /{1}   ", m, mangaAllCount));
                try
                {
                    var result = getNewReleaseByMangaChapter(m);
                    Services.Log.Info(result);
                }
                catch (Exception ex)
                {
                    Services.Log.Info(ex.Message);
                }
            }
            return Task.FromResult(true);
        }
        public string getNewReleaseByMangaChapter(string Manga)
        {
            try
            {
                double chapter = -1;
                var domain = "http://www.niceoppai.net/{0}";
                var url = string.Format(domain, Manga);
                var html = getHtmlByUrl(url);
                var htmlDoc = new HtmlDocument();
                htmlDoc.LoadHtml(html);

                var ul = htmlDoc.DocumentNode.Descendants("ul").Where(d =>
                            d.Attributes.Contains("class") && d.Attributes["class"].Value.Contains("lst")
                        ).FirstOrDefault();
                var li = ul.Descendants("li").Where(d =>
                            d.Attributes.Contains("class") && d.Attributes["class"].Value.Contains("lng_")
                        ).FirstOrDefault();

                if (li != null)
                {
                    var aManga = li.Descendants("a").FirstOrDefault();
                    var Mangahref = aManga.Attributes["href"].Value.Trim();
                    var MangaChapterName = aManga.Attributes["title"].Value.Trim();
                    int l = Mangahref.Split('/').Count();
                    string chapterString = Mangahref.Split('/')[l - 2];
                    return Mangahref;
                }
                
            }
            catch (Exception ex)
            {

                Services.Log.Info(ex.Message);
            }
            return "not found link";

        }

        private string getHtmlByUrl(string url)
        {
            WebClient c = new WebClient();
            c.Headers.Add("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; .NET CLR 1.0.3705;)");
            string result = string.Empty;
            try
            {
                c.Encoding = Encoding.UTF8;
                result = c.DownloadString(new Uri(url));
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return result;
        }
    }
}