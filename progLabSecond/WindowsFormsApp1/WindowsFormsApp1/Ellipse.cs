using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;

namespace System.Drawing
{
    class Ellipse : GraphObject
    {

        public Ellipse() :base()
        {
        }

        public int X
        {
            get { return x; }
            set
            {
                if (value < 0) { throw new ArgumentException("x<0!"); }
                x = value;
            }
        }

        public int Y
        {
            get { return y; }
            set
            {
                if (value < 0) { throw new ArgumentException("y<0!"); }
                y = value;
            }
        }


        public override bool ContainsPoint(Point p)
        {
            if (Math.Pow((p.X-x-w/2),2) / Math.Pow((w/2),2) + Math.Pow((p.Y-y-h/2),2)/Math.Pow((h/2),2) <= 1) return true;
            return false;
        }

        public override void Draw(Graphics g)
        {
            g.FillEllipse(brush, x, y, w, h);
            g.DrawEllipse(Pens.Black, x, y, w, h);
            if (Selected)
            {
                g.DrawEllipse(Pens.Red, x, y, w, h);
            }
            else
            {
                g.DrawEllipse(Pens.Black, x, y, w, h);
            }
        }
    }

}
