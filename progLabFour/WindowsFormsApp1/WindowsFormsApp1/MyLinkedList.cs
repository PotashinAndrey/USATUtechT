using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsApp1
{
    public class MyLinkedList
    {
        private ListNode headNode;
        private ListNode tailNode;

        public MyLinkedList()
        {
            headNode = null;
            tailNode = null;
        }

        public int Length
        {
            get
            {
                var nextNode = headNode;
                int i;
                for (i = 0; nextNode != null; i++, nextNode = nextNode.Next) ;
                return i;
            }
        }

        public void addNodeToStart(int value)
        {
            if (headNode == null)
            {
                headNode = new ListNode(value);
                tailNode = headNode;
                return;
            }
            ListNode tempNode = headNode;
            headNode = new ListNode(value, tempNode);
        }

        public void addNodeToEnd(int value)
        {
            if (headNode == null)
            {
                headNode = new ListNode(value);
                tailNode = headNode;
                return;
            }
            tailNode.Next = new ListNode(value);
            tailNode = tailNode.Next;
        }

        public void addNodeToSelectedPlace(int value, int place)
        {
            int length = Length;

            if (headNode == null || place > length - 1 || place < 0) throw new Exception("Wrong place");

            if (place == length) {
                addNodeToEnd(value);
                return;
            }
            
            if (place == 0)
            {
                addNodeToStart(value);
                return;
            }

            var nextNode = headNode;
            int i;
            for (i = 0; i != place; i++, nextNode = nextNode.Next) ;

            ListNode tempNide = new ListNode(value, nextNode.Next);

            nextNode.Next = tempNide;

        }   

        public void deletNodeToSelectedPlace(int place)
        {
            int length = Length;

            if (headNode == null || place > length - 1) throw new Exception("Wrong place");

            var nextNode = headNode;
            int i;
            for (i = 0; i != place - 1; i++, nextNode = nextNode.Next) ;

            if (length == 1)
            {
                tailNode = null;
                headNode = null;
                return;
            }

            if (place + 1 >= length) {
                nextNode.Next = null;
                tailNode = nextNode;
            }

            if (place == 0)
            {
                headNode = nextNode.Next;
                return;
            }

            nextNode.Next = nextNode.Next.Next;
        }
    }   
}
