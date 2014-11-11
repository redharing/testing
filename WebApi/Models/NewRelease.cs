using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class NewRelease
    {
        public int MangaId { get; set; }
        public string MangaName { get; set; }
        public string Chapter { get; set; }
        public string ChapterName { get; set; }
        public string ChapterImagePath { get; set; }
        public System.DateTime ModifyDate { get; set; }
        public bool IsEnable { get; set; }
    }
}