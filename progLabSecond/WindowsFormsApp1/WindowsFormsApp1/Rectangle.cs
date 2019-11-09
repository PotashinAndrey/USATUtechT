using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;

namespace System.Drawing
{
    class Rectangle : GraphObject
    {

        public Rectangle() :base()
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
            if (p.X <= x + w && p.X >= x && p.Y <= y + h && p.Y >= y) return true;
            return false;
        }


        public override void Draw(Graphics g)
        {
            g.FillRectangle(brush, x, y, w, h);
            g.DrawRectangle(Pens.Black, x, y, w, h);
            if (Selected)
            {
                g.DrawRectangle(Pens.Red, x, y, w, h);
            }
            else
            {
                g.DrawRectangle(Pens.Black, x, y, w, h);
            }
        }
    }
}
