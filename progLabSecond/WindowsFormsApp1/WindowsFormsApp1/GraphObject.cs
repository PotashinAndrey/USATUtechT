using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;

namespace System.Drawing
{
    class GraphObject
    {
        private
            Color[] cols = { Color.Red, Color.Green, Color.Yellow, Color.Tomato, Color.Cyan };
            int x = 0;
            int y = 0;
            Color c = Color.Red;
            int w = 50;
            int h = 50;
            SolidBrush brush;
            int X
            {   get { return x; }
                set {
                if (value < 0) { throw new ArgumentException("x<0!"); }
                x = value;}}

            int Y
            {   get { return y; }
                set {
                if (value < 0) { throw new ArgumentException("y<0!"); }
                y = value; }}

        static Random r = new Random();

        public GraphObject()
        {
            c = cols[r.Next(cols.Length)];
            x = r.Next(200);
            y = r.Next(200);
            w = 50;
            h = 50;
            brush = new SolidBrush(c);
        }




        public void Draw(Graphics g)
        {
            g.FillRectangle(brush, x, y, w, h);
            g.DrawRectangle(Pens.Black, x, y, w, h);
        }
    }
}
