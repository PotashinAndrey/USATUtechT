using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public class PanelView : Panel, IView
    {
    public delegate void onClickHandler(int x, int y);
        public event onClickHandler Clicked;
        public IModel Model { get; set; }

        public void UpdateView()
        {
            Invalidate();
        }

        public static void ClickedXY(int X, int Y)
        {
            return;
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            base.OnPaint(e);
            if (Model == null) return;
            Graphics g = e.Graphics;
            foreach (Node n in Model.AllNodes)
            {   
                if (n.Status == true)
                {
                    g.DrawEllipse(Pens.Green, n.X * 20, n.Y * 20, 20, 20);//!
                }
                else
                {
                    g.DrawEllipse(Pens.Red, n.X * 20, n.Y * 20, 20, 20);
                }
            }
        }

        protected override void OnMouseClick(MouseEventArgs e)
        {
            base.OnMouseClick(e);
        }
    }
}
