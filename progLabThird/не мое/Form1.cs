using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace prog_lab3
{
     partial class Form1 : Form, IController
    {
        //List<IView> views = new List<IView>();
        //List<PanelView> vew = new List<PanelView>();
        IModel model;
        public void AddView(IView v)
        {
            model.Changed += new Action(v.UpdateView);
        }
        public Form1()
        {
            InitializeComponent();
            IView labView;
            labView = new LabelView(label1);
            PanelView pan;
            MyDataGrid dat = new MyDataGrid();
            
            
            pan = new PanelView();
            pan = panelView1;
            Model = new MyModel();
            model = Model;
            labView.Model = model;
            pan.Model = model;
            pan.BorderStyle= BorderStyle.FixedSingle;
            dat.Model = model;
            dat.L(dataGridView1);
            //AddView(labView);
            AddView(pan);
            AddView(labView);
            AddView(dat);
            //что нужно сделать

        }
         IModel Model { get; set; }
        IModel IController.Model { get; set; }

        static Random r = new Random();
        public void Add()
        {
            
            model.AddNode(r.Next(100));
            
        }


        public void Remove()
        {
            model.RemoveLastNode();
        }

        public void Color()
        {
            dat.UpdateView();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void Button1_Click(object sender, EventArgs e)
        {
            Add();
        }

        private void Button2_Click(object sender, EventArgs e)
        {
            Remove();
        }

        private void DataGridView1_CellMouseUp(object sender, DataGridViewCellMouseEventArgs e)
        {
            Color();
        }
    }
}
