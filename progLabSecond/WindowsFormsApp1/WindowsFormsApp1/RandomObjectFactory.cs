using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;

namespace System.Drawing
{
    class RandomObjectFactory : IGraphicFactory
    {
        static Random rnd = new Random();

        static GraphObject rand()
        {
            if (rnd.Next(10) >= 5) return new Rectangle();
            return new Ellipse();
        }

        public GraphObject CreateGraphObject()
        {
            return rand(); 
        }
    }
}
