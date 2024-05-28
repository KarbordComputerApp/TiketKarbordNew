using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TiketKarbord.Controllers.Unit;
using System.Reflection;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Net.NetworkInformation;
using System.Net;

namespace TiketKarbord.Controllers
{
    public class HomeController : Controller
    {

        // GET: Home

        public ActionResult Index()
        {
            return View();
        }

     

        public ActionResult Login()
        {
            return View();
        }

    }
}