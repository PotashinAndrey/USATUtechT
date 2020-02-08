using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public class MyDataGrid : DataGridView, IView
    {
        public IModel Model { get; set; }
        DataGridView l;

        public delegate void Noder(int x, int y);//!
        public event Noder Changer;//!

        public void FuseGrid(DataGridView i)
        {
            this.l = i;
        }
        public void UpdateView()
        {
            l.AutoGenerateColumns = true;
            l.DataSource = Model.AllNodes.ToArray();
        }
    }
}
