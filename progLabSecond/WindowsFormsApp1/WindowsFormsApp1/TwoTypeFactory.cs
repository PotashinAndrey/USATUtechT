using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;

namespace System.Drawing
{
    class TwoTypeFactory : IGraphicFactory
    {
        bool counter = false;
        public GraphObject CreateGraphObject()
        {
            counter = !counter;
            if (counter) return new Ellipse();
            return new Rectangle();
        }
    }
}
