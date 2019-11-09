using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;

namespace System.Drawing
{
    abstract class GraphObject
    {
        public Color[] cols = { Color.Red, Color.Green, Color.Yellow, Color.Tomato, Color.Cyan };
        public int x = 0;
        public int y = 0;
        public static Color c = Color.Red;
        public int w = 50;
        public int h = 50;
        public SolidBrush brush = new SolidBrush(c);

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

        



        public GraphObject()
        {
            x = r.Next(750);
            y = r.Next(320);
            w = r.Next(30) + 50;
            h = r.Next(30) + 50;
            c = cols[r.Next(cols.Length)];
            brush = new SolidBrush(c);
        }

        public bool Selected { get; set; } 
        public bool Deleted { get; set; }

        static Random r = new Random();

        public abstract bool ContainsPoint(Point p);


        public abstract void Draw(Graphics g);
    }
}
