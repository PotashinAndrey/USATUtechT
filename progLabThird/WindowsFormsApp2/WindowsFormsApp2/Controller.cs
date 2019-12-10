using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsApp2
{
    class Controller : IController
    {
        public IModel Model { get => model; set => this.model = value; }
        List<IView> views = new List<IView>();
        IModel model;

        static Random r = new Random();

        public void Add()
        {
            model.AddNode(r.Next(100));
        }

        public void AddView(IView v)
        {
            views.Add(v);
        }

        public void Remove()
        {

            model.RemoveLastNode();
        }
    }
}
